/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/

//snippet-sourcedescription:[s3_upload.js demonstrates how to upload an arbitrarily-sized stream to an Amazon S3 bucket.]
//snippet-service:[s3]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon S3]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

// snippet-start:[s3.JavaScript.buckets.upload]

require('dotenv').config()

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'sa-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
// chamar S3 para recuperar o arquivo de upload para o BUCKET especificado

// console.log('url bucket...')
//   console.log(process.env.AWS_BUCKET + '/backup-servidor-antigo/')
// console.log('fechando url bucket...')
// return;

var uploadParams = {Bucket: process.env.AWS_BUCKET + '/backup-servidor-antigo', Key: '', Body: ''};
// Nome, URL do arquivo p/ upload
// var file = 's3-backup/PASTA_TEST.zip';
var file = process.argv[2];

// Configure the file stream and obtain the upload parameters
// Configure o fluxo de arquivos e obtenha os parâmetros de upload
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});

uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// console.log('fileStream...')
// console.log(uploadParams)
// return

// call S3 to retrieve upload file to specified bucket
// chamar S3 para recuperar o arquivo de upload para o bucket especificado
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
// snippet-end:[s3.JavaScript.buckets.upload]