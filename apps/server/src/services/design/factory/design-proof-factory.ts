import { DesignProofFileRecord } from '../db/design-proof-file-table'
import { DesignProofLocationRecord } from '../db/design-proof-location-table'
import { DesignProofRecord } from '../db/design-proof-table'

interface DesignProofFile extends DesignProofFileRecord {}

interface DesignFactoryProofLocation extends DesignProofLocationRecord {}

export interface DesignFactoryProof extends DesignProofRecord {
  files: DesignProofFile[]
  locations: DesignFactoryProofLocation[]
}

const designProofFactory = ({
  designProof,
  files,
  locations,
}: {
  designProof: DesignProofRecord
  files: DesignProofFileRecord[]
  locations: DesignProofLocationRecord[]
}): DesignFactoryProof => {
  return {
    ...designProof,
    files,
    locations,
  }
}

export { designProofFactory }
