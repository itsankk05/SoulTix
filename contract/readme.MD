# Scripts

`supra move tool publish --package-dir /supra/configs/move_workspace/soultix --profile test6 --url https://rpc-testnet.supra.com`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::add_admin' --args address:<CREATOR_ADDR> --url https://rpc-testnet.supra.com --profile test6`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::create_event_collection' --args String:'Chilluminati 24 Gold' String:'HelloBeta' u64:100 u64:10 String:'ipfs://helloworld' u64:20 u64:100 String:'ZaidTicket' String:'ipfs://zaidiswinning' --url https://rpc-testnet.supra.com --profile test4`

`supra move tool view --function-id '<DEPLOYED_ADDR>::event::get_collection_details' --args String:'Chilluminati 24 Gold' --url https://rpc-testnet.supra.com --profile test6`

`supra move tool run --function-id '<DEPLOYED_ADDR>::event::buy_tokens' --args String:'Chilluminati 24 Gold' u64:100 --url https://rpc-testnet.supra.com --profile default`
