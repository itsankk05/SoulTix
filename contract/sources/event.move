module soultix_addr::event{

    use aptos_token_objects::aptos_token;
    // use aptos_token_objects::token;
    use aptos_token_objects::collection;
    use aptos_token_objects::royalty;

    use std::signer;
    use std::string::{Self, String};

    use supra_framework::supra_coin;
    use supra_framework::coin;
    // use std::error;
    // use std::vector;
    // use std::option::{Self, Option};
    // use std::bcs;
    // use std::account;
    // use std::vector;

    // use 0x4::property_map;
    // use 0x4::royalty;

    // use supra_framework::object::{Self, Object};
    
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_std::table::{Self, Table};
    // use aptos_std::string_utils;


    // Errors
    const E_NOT_OWNER: u64 = 1;
    const E_NOT_ADMIN: u64 = 2;
    const E_COLLECTION_NOT_FOUND: u64 = 3;
    const E_INSUFFICIENT_TOKENS: u64 = 4;
    const E_INSUFFICIENT_FUNDS: u64 = 5;
    const E_TOKEN_LIMIT_EXCEEDED: u64 = 6;
    const E_ADMIN_ALREADY_EXISTS: u64 = 7;

    // Owner and Admin management resource
    struct AdminManagement has key {
        owner: address,
        creators: SimpleMap<address, bool>
    }

    // Global storage for collections
    struct CollectionRegistry has key {
        collections: Table<String, EventCollection>
    }

    // Collection struct to store collection details
    struct EventCollection has key, store, drop {
        name: String,
        description: String,
        max_supply: u64,
        remaining_tokens: u64,
        price_per_token: u64,
        creator_addr: address
    }

    /// `init_module` is automatically called when publishing the module.
    /// In this function, we create an example NFT collection and an example token.
    fun init_module(source_account: &signer) acquires AdminManagement {
        // Initialise owner
        let owner_addr = signer::address_of(source_account);
        
        // Create admin management resource
        move_to(source_account, AdminManagement {
            owner: owner_addr,
            creators: simple_map::create()
        });
        
        // Add owner as the first admin
        simple_map::add(
            &mut borrow_global_mut<AdminManagement>(@soultix_addr).creators, 
            owner_addr, 
            true
        );
        
        // Initialize collection registry
        move_to(source_account, CollectionRegistry {
            collections: table::new()
        });

        let collection_name = string::utf8(b"Soultix");
        let description = string::utf8(b"Built at ETHIndia 24");
        let collection_uri = string::utf8(b"ipfs://bafkreihxckqitjj3jy6ndxppbgyealdio3knizkvupwhwugppg4vnaxyfm");
        let token_name = string::utf8(b"Chilluminati Tour #1");
        let token_uri = string::utf8(b"ipfs://bafkreihfvdttmpu3okdcuwn2hdg4sgektbrpjer7ptiazu732j4gzzq2eq");
        // This means that the supply of the token will not be tracked.
        let maximum_supply = 100;
        // This variable sets if we want to allow mutation for collection description, uri, and maximum.
        // Here, we are setting all of them to false, which means that we don't allow mutations to any CollectionData fields.
        let mutate_setting = vector<bool>[ false, false, false ];

        // Create the nft collection.
        aptos_token::create_collection(
            source_account, 
            description, 
            maximum_supply, 
            collection_name, 
            collection_uri, 
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            10,
            100
        );

        let property_keys = vector<String>[];
        let property_values = vector<vector<u8>>[];
        let property_types = vector<String>[];

        aptos_token::mint(
            source_account,
            collection_name,
            string::utf8(b""),
            token_name,
            token_uri,
            property_keys,
            property_types,
            property_values
        );

        
    }

    // Function to add a new admin (only by the contract owner)
    public entry fun add_admin(
        owner: &signer, 
        new_admin_address: address
    ) acquires AdminManagement {
        let owner_addr = signer::address_of(owner);
        
        // Get admin management resource
        let admin_management = borrow_global_mut<AdminManagement>(@soultix_addr);
        
        // Ensure only the contract owner can add creators
        assert!(admin_management.owner == owner_addr, E_NOT_OWNER);
        
        // Check if the new admin already exists
        assert!(
            !simple_map::contains_key(&admin_management.creators, &new_admin_address), 
            E_ADMIN_ALREADY_EXISTS
        );
        
        // Add new admin
        simple_map::add(&mut admin_management.creators, new_admin_address, true);
    }

    // Function to remove an admin (only by the contract owner)
    public entry fun remove_admin(
        owner: &signer, 
        admin_to_remove: address
    ) acquires AdminManagement {
        let owner_addr = signer::address_of(owner);
        
        // Get admin management resource
        let admin_management = borrow_global_mut<AdminManagement>(@soultix_addr);
        
        // Ensure only the contract owner can remove creators
        assert!(admin_management.owner == owner_addr, E_NOT_OWNER);
        
        // Prevent removing the owner from admin list
        assert!(admin_to_remove != admin_management.owner, E_NOT_OWNER);
        
        // Remove admin
        if (simple_map::contains_key(&admin_management.creators, &admin_to_remove)) {
            simple_map::remove(&mut admin_management.creators, &admin_to_remove);
        }
    }

    // Check if an address is an admin
    public fun is_admin(check_address: address): bool acquires AdminManagement {
        let admin_management = borrow_global<AdminManagement>(@soultix_addr);
        simple_map::contains_key(&admin_management.creators, &check_address)
    }

    // Get the contract owner
    public fun get_owner(): address acquires AdminManagement {
        let admin_management = borrow_global<AdminManagement>(@soultix_addr);
        admin_management.owner
    }

    // Function to create a new collection (only by admin)
    public entry fun create_event_collection(
        creator: &signer, 
        name: String, 
        description: String, 
        max_supply: u64, 
        price_per_token: u64,
        uri: String,
        royalty_numerator: u64,
        royalty_denominator: u64,
        token_name:String,
        token_uri: String
    ) acquires AdminManagement, CollectionRegistry {
        // Verify creator
        let creator_addr = signer::address_of(creator);
        assert!(is_admin(creator_addr), E_NOT_ADMIN);
        
        // Get the collection registry
        let registry = borrow_global_mut<CollectionRegistry>(@soultix_addr);
        
        // Ensure collection doesn't already exist
        assert!(!table::contains(&registry.collections, name), E_COLLECTION_NOT_FOUND);
        
        // Create and add new collection
        let new_collection = EventCollection {
            name,
            description,
            max_supply,
            remaining_tokens: max_supply,
            price_per_token,
            creator_addr
        };

        let mutable_description = true;
        let mutable_royalty = false;
        let mutable_uri = false;
        let mutable_token_description = false;
        let mutable_token_name = false;
        let mutable_token_properties = false;
        let mutable_token_uri = false;
        let tokens_burnable_by_creator = true;
        let tokens_freezable_by_creator = true;

        aptos_token::create_collection(
            creator,
            description,
            max_supply,
            name,
            uri,
            mutable_description,
            mutable_royalty,
            mutable_uri,
            mutable_token_description,
            mutable_token_name,
            mutable_token_properties,
            mutable_token_uri,
            tokens_burnable_by_creator,
            tokens_freezable_by_creator,
            royalty_numerator,
            royalty_denominator
        );
        
        table::add(&mut registry.collections, new_collection.name, new_collection);

        // Mint the initial tokens to the creator
        
        let property_keys = vector<string::String>[];
        let property_types = vector<string::String>[];
        let property_values = vector<vector<u8>>[];

        for (i in 0..max_supply) {
            aptos_token::mint(
                creator,
                name,
                description,
                token_name,
                token_uri,
                property_keys,
                property_types,
                property_values
            );
        }
    }

    // Function to buy tokens from a collection
    public entry fun buy_tokens(
        buyer: &signer, 
        collection_name: String, 
        quantity: u64
    ) acquires CollectionRegistry {
        let buyer_addr = signer::address_of(buyer);
        
        // Get the collection registry
        let registry = borrow_global_mut<CollectionRegistry>(@soultix_addr);
        
        // Verify collection exists
        assert!(table::contains(&registry.collections, collection_name), E_COLLECTION_NOT_FOUND);
        
        // Get the specific collection
        let collection = table::borrow_mut(&mut registry.collections, collection_name);
        
        // Check if enough tokens are available
        assert!(collection.remaining_tokens >= quantity, E_INSUFFICIENT_TOKENS);
        
        // Calculate total cost
        let total_cost = collection.price_per_token * quantity;

        // Ensure buyer has sufficient funds (assuming a function to check balance exists)
        assert!(coin::balance<supra_coin::SupraCoin>(buyer_addr) >= total_cost, E_INSUFFICIENT_FUNDS);
        
        // Transfer the total cost from buyer to the contract (assuming a transfer function exists)
        coin::transfer<supra_coin::SupraCoin>(buyer, collection.creator_addr, total_cost);
        
        // Mint the tokens to the buyer (assuming a mint function exists)
        aptos_token::mint(buyer, collection_name, string::utf8(b""), string::utf8(b"TicketWinner"), string::utf8(b""), vector<String>[], vector<String>[], vector<vector<u8>>[]);
        
        // Update remaining tokens
        collection.remaining_tokens = collection.remaining_tokens - quantity;
    }

    // Cleanup function to remove a collection (admin only)
    public entry fun remove_collection(
        admin: &signer, 
        collection_name: String
    ) acquires AdminManagement, CollectionRegistry {
        // Verify admin
        let admin_addr = signer::address_of(admin);
        assert!(is_admin(admin_addr), E_NOT_ADMIN);
        
        // Get the collection registry
        let registry = borrow_global_mut<CollectionRegistry>(@soultix_addr);
        
        // Remove collection if it exists
        if (table::contains(&registry.collections, collection_name)) {
            table::remove(&mut registry.collections, collection_name);
        }
    }

    // Function to get collection details (view function)
    #[view]
    public fun get_collection_details(collection_name: String): (String, String, u64, u64, u64, address) 
    acquires CollectionRegistry {
        let registry = borrow_global<CollectionRegistry>(@soultix_addr);
        
        // Verify collection exists
        assert!(table::contains(&registry.collections, collection_name), E_COLLECTION_NOT_FOUND);
        
        let collection = table::borrow(&registry.collections, collection_name);
        
        (
            collection.name,
            collection.description,
            collection.max_supply,
            collection.remaining_tokens,
            collection.price_per_token,
            collection.creator_addr
        )
    }

    #[view]
    public fun collection_exists(collection_name: String): bool 
    acquires CollectionRegistry {
        let registry = borrow_global<CollectionRegistry>(@soultix_addr);
        table::contains(&registry.collections, collection_name)
    }

    // // Initialization tests
    // #[test_only]
    // use std::debug::print;
    // use std::string::utf8;
    // use supra_framework::account;


    #[test(owner = @0x1)]
    public fun test_initialize(owner: &signer) acquires AdminManagement {
        init_module(owner);
        assert!(is_admin(signer::address_of(owner)), E_NOT_ADMIN);
        assert!(exists<CollectionRegistry>(@soultix_addr), 0);
    }

    // Admin management tests
    #[test(owner = @0x1, admin = @0x2)]
    public fun test_add_and_remove_admin(owner: &signer, admin: &signer) acquires AdminManagement {
        // Prepare accounts
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(admin));
        
        // Initialize with owner
        init_module(owner);
        
        // Add new admin by owner
        add_admin(owner, signer::address_of(admin));
        assert!(is_admin(signer::address_of(admin)), E_NOT_ADMIN);
        
        // Remove admin by owner
        remove_admin(owner, signer::address_of(admin));
        assert!(!is_admin(signer::address_of(admin)), 0);
    }

    // Collection creation test
    #[test(owner = @0x1, admin = @0x2)]
    public fun test_create_collection(owner: &signer, admin: &signer) acquires AdminManagement, CollectionRegistry {
        // Prepare accounts
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(admin));
        
        // Initialize with owner
        init_module(owner);
        
        // Add admin
        add_admin(owner, signer::address_of(admin));
        
        let collection_name = string::utf8(b"Test Collection");
        let description = string::utf8(b"A test collection for demonstration");
        
        // Create collection by admin
        create_event_collection(
            admin, 
            collection_name, 
            description, 
            1000, 
            10  // 10 coins per token
        );
        
        let (name, desc, total, remaining, price) = get_collection_details(collection_name);
        assert!(name == collection_name, 0);
        assert!(total == 1000, 0);
        assert!(remaining == 1000, 0);
        assert!(price == 10, 0);
    }
}