/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestDesignLocationCreateInput } from './globalTypes'

// ====================================================
// GraphQL mutation operation: UseDesignLocationFormCreateLocationMutation
// ====================================================

export interface UseDesignLocationFormCreateLocationMutation_designRequestDesignLocationCreate_designRequest {
  __typename: 'DesignRequest'
  id: string
}

export interface UseDesignLocationFormCreateLocationMutation_designRequestDesignLocationCreate {
  __typename: 'DesignRequestDesignLocationCreatePayload'
  designRequest: UseDesignLocationFormCreateLocationMutation_designRequestDesignLocationCreate_designRequest | null
}

export interface UseDesignLocationFormCreateLocationMutation {
  designRequestDesignLocationCreate: UseDesignLocationFormCreateLocationMutation_designRequestDesignLocationCreate | null
}

export interface UseDesignLocationFormCreateLocationMutationVariables {
  input: DesignRequestDesignLocationCreateInput
}
