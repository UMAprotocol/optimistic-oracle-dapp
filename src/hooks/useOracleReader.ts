import {oracle} from 'helpers/oracleClient'
import {ethers} from 'ethers'
import usdcLogo from "assets/usdc-logo.png";

const { formatUnits } = ethers.utils

function nullError(call:(...args:any[])=>any, ...args:any[]){
  try{
    return call(...args)
  }catch(err){
    return undefined
  }
}


export default function useOracleReader(state:oracle.types.state.State) {
  const read = new oracle.store.Read(state)
  const request=nullError(read.request.bind(read))
  const defaultLiveness=nullError(read.defaultLiveness.bind(read))
  const collateralProps=nullError(read.collateralProps.bind(read))
  const decimals = collateralProps && collateralProps.decimals
  const totalBond = request && decimals && formatUnits(request.bond.add(request.finalFee),collateralProps.decimals)
  const reward = request && decimals && formatUnits(request.reward,collateralProps.decimals)
  const liveness = request && request.customLiveness.gt(0) ? request.customLiveness.toNumber() : defaultLiveness && defaultLiveness.toNumber()

  return {
    totalBond,
    reward,
    liveness,
    collateralSymbol: collateralProps && collateralProps.symbol,
    logo:usdcLogo,
  }
}


