# Transactions
https://testnet.suprascan.io/address/0xdb29ca185f0be5d8ab49eb376cb1306c8f5a016878ff90957e058488a80bf29f/f?tab=addr-transaction&pageNo=1&rows=10

https://testnet.suprascan.io/address/0xce0d4375a94ff090d15653bc9ee8d98b98b38386f31830e8b4b2826bd7087a0d/f?tab=addr-transaction&pageNo=1&rows=10

# Scripts

`supra move tool publish --package-dir /supra/configs/move_workspace/soultix --profile test6 --url https://rpc-testnet.supra.com`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::add_admin' --args address:<CREATOR_ADDR> --url https://rpc-testnet.supra.com --profile test6`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::create_event_collection' --args String:'Chilluminati 24 Gold' String:'HelloBeta' u64:100 u64:10 String:'ipfs://helloworld' u64:20 u64:100 String:'ZaidTicket' String:'ipfs://zaidiswinning' --url https://rpc-testnet.supra.com --profile test4`

`supra move tool view --function-id '<DEPLOYED_ADDR>::event::get_collection_details' --args String:'Chilluminati 24 Gold' --url https://rpc-testnet.supra.com --profile test6`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::buy_tokens' --args String:'Chilluminati 24 Gold' u64:100 --url https://rpc-testnet.supra.com --profile default`
