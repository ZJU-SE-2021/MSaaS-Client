/* tslint:disable */
/* eslint-disable */
/**
 * MsaasBackend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MedicalRecordForm
 */
export interface MedicalRecordForm {
    /**
     * 
     * @type {number}
     * @memberof MedicalRecordForm
     */
    appointmentId?: number;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordForm
     */
    symptom?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordForm
     */
    pastMedicalHistory?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordForm
     */
    diagnosis?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordForm
     */
    prescription?: string | null;
}

export function MedicalRecordFormFromJSON(json: any): MedicalRecordForm {
    return MedicalRecordFormFromJSONTyped(json, false);
}

export function MedicalRecordFormFromJSONTyped(json: any, ignoreDiscriminator: boolean): MedicalRecordForm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appointmentId': !exists(json, 'appointmentId') ? undefined : json['appointmentId'],
        'symptom': !exists(json, 'symptom') ? undefined : json['symptom'],
        'pastMedicalHistory': !exists(json, 'pastMedicalHistory') ? undefined : json['pastMedicalHistory'],
        'diagnosis': !exists(json, 'diagnosis') ? undefined : json['diagnosis'],
        'prescription': !exists(json, 'prescription') ? undefined : json['prescription'],
    };
}

export function MedicalRecordFormToJSON(value?: MedicalRecordForm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'appointmentId': value.appointmentId,
        'symptom': value.symptom,
        'pastMedicalHistory': value.pastMedicalHistory,
        'diagnosis': value.diagnosis,
        'prescription': value.prescription,
    };
}


