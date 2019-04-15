import Soap from 'soap';
import AWS from 'aws-sdk';
import X509HttpClient from 'soap-x509-http';
import request from 'request';
import { accountInformationProcess } from './handlers/checkEligibility';

/// <reference types="aws-sdk" />

export const hello = async (event) => {
    
    // var s3 = new AWS.S3();
    // var wsdl = './wsdl/AccountService.wsdl';
    
    var eligbilityStatus = new accountInformationProcess(event.requestBody).EligiblityStatus();

    var response = {
        status: 200,
        data: eligbilityStatus
    }
    
    // let caCertObjectPromise = s3.getObject({ Bucket: '', Key: '' }).promise();
    // let privateKeyObjectPromise = s3.getObject({ Bucket: '', Key: '' }).promise();

    // var certs = await Promise.all([ caCertObjectPromise, privateKeyObjectPromise ]);

    // var x509Client = new X509HttpClient({
    //     ca: certs[0].Body.toString('ascii'),
    //     rejectUnauthorized: false
    // },
    // { key: certs[1].Body.toString('ascii') },
    // ['To'])

    

    return response;

}