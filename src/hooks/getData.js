import { stakingContract } from "../config"

import Cookies from 'universal-cookie'
import { useState } from "react"
import { isAddress } from "ethers/lib/utils";
import Web3 from "web3";
import { useProvider } from "wagmi";

let stakeInfo;
let pendingReward;
let isLeftAddress;
export const fetchAllData = async (account) => {
    [stakeInfo, pendingReward, isLeftAddress] = await Promise.all([
        stakingContract.methods.stake(account).call(),
        stakingContract.methods.pendingReward(account).call(),
        stakingContract.methods.left(account).call()
    ])

    return {
        stakeInfo,
        pendingReward,
        isLeftAddress
    }
}

export const getAllData = async () => {

    return {
        stakeInfo,
        pendingReward,
        isLeftAddress
    }
}

export const invest = async (depositAmount, account) => {
 
    const cookies = new Cookies();
    let ref = cookies.get('ref')
    if(!ref || ref == true) 
    { 
        ref = "0x0000000000000000000000000000000000000000" 
    }
    await stakingContract.methods.deposit(ref).send({from: account,value: depositAmount}).then((result) => {
        return true;
    }).catch((err) => {
        console.log("reinvest error", err)
        return false;
    }) ;
}

export const reinvest = async (amount, account) => {
    await stakingContract.methods.reinvest(amount).send({from:account}).then((result) => {
        return true;
    }).catch((err) => {
        console.log("reinvest error", err)
        return false;
    }) 
}

export const withdraw = async(amount, account) => {
    await stakingContract.methods.withdraw(amount).send({from: account}).then((result) => {
        return true;
    }).catch((err) => {
        console.log("withdarw error", err)
        return false
    })
}

export const fetchReferralData = async (account) => {
    const [walletArrays_1, walletArrays_2, walletArrays_3] = await Promise.all([
        stakingContract.methods.getLevel1Data(account).call(),
        stakingContract.methods.getLevel2Data(account).call(),
        stakingContract.methods.getLevel3Data(account).call(),
    ])
    let stakeData_1 = []
    let stakeData_2 = []
    let stakeData_3 = []
    if(walletArrays_1) {
     stakeData_1 = await Promise.all(walletArrays_1.map((wallet) => stakingContract.methods.stake(wallet).call()))
     if(walletArrays_2) {
        stakeData_2 = await Promise.all(walletArrays_2.map((wallet) => stakingContract.methods.stake(wallet).call()))
        if(walletArrays_3) {
            stakeData_3 = await Promise.all(walletArrays_3.map((wallet) => stakingContract.methods.stake(wallet).call()))
        }
     }
    }
    return {
        stakeData_1, stakeData_2, stakeData_3
    }
}

export const leaveWhale = async (account) => {
    await stakingContract.methods.leaveBigWhale().send({from: account}).then((result) => {
        return true;
    }).catch((err) => {
        console.log("withdarw error", err)
        return false;
    });
}

