import { createRequestActionType } from '../utils'

export const vmCreate =  createRequestActionType('VM_CREATE')
export const vmStart = createRequestActionType('VM_START') 
export const vmStop = createRequestActionType('VM_STOP')
export const vmDelete = createRequestActionType('VM_DELETE')
export const vmUpgrade = createRequestActionType('VM_UPGRADE')
export const vmDowngrade = createRequestActionType('VM_DOWNGRADE')
export const vmUsage = createRequestActionType('VM_USAGE')
export const vmCharges = createRequestActionType('VM_CHARGES')


