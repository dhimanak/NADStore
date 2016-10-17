pragma solidity ^0.4.2;

contract NADAddressStore { 
    Address[] public addresses;
    
    struct Address {
        bytes32 state; 
        bytes32 county; 
        bytes32 stN_PosTyp;
       // bytes32 stN_PosDir;
       // bytes32 stN_PosMod;
       //    bytes32 addNum_Pre;
        //bytes32 addNum_Suf;
    //    bytes32 landmkName;
     //   uint add_Number;
        bytes32 guid;
    }
    
    function addAddress(bytes32 _state, bytes32 _county,bytes32 _stnPosType, bytes32 _guid) returns(bool success){
        Address memory newAddress;
        newAddress.state = _state;
        newAddress.county = _county;
        newAddress.stN_PosTyp = _stnPosType;
        newAddress.guid = _guid;
        
        addresses.push(newAddress);
        
        return true;
    }
    
    function getAddresses() constant returns(bytes32[], bytes32[], bytes32[], bytes32[]){
        uint length = addresses.length;
        
        bytes32[] memory states = new bytes32[](length) ; 
        bytes32[] memory counties = new bytes32[](length) ;
        bytes32[] memory posTypes = new bytes32[](length) ;
        bytes32[] memory guids = new bytes32[](length) ;
        
        for(uint i = 0; i < addresses.length; i++){
            states[i] = addresses[i].state;
            counties[i] = addresses[i].county;
            posTypes[i] = addresses[i].stN_PosTyp;
            guids[i] = addresses[i].guid;
        }
        
        return (states, counties, posTypes, guids);
    }
    
  }