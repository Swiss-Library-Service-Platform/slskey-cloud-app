# PURA SLSP Cloud App
<img src=./preview/pura.png alt="drawing" width="400"/>

## Overview

This repository contains the [Alma Cloud App](https://developers.exlibrisgroup.com/cloudapps/) for the [SLSP](https://slsp.ch/) PURA service.

Currently this app only supports the PURA activation of a selected user.
For checking the PURA status of users and other features, please use the [PURA User Management Backend](https://pura.swisscovery.network/).

## Requirements

In order to use this app

- your institution must be subscriber to the SLSP PURA service.

- your Alma username has to be unlocked by SLSP

Please [contact SLSP](https://slsp.ch/en/contact) if you have any questions.

## Daily Use

Start Screen of the app:

<img src=./preview/start.png alt="drawing" width="300"/>

Navigate to a Alma page with user entities. 
This can either be a user list with several entities or a user detail page. 

<img src=./preview/userfound.png alt="drawing" width="300"/>

Select the user you want to active for PURA publishers.

<img src=./preview/beforeactivate.png alt="drawing" width="300"/>

Press "Activate" to activate the selected user for the PURA publishers.

<img src=./preview/activated.png alt="drawing" width="300"/>

## Missing permissions

If you receive an error message "You don’t have permissions for the PURA service", please [contact SLSP](https://slsp.ch/en/contact) to unlock your user for the service.

## Issues and defects
Please use the GitHub "Issues" of this repository to report any defects. We will have a look into it as soon as possible.

## Licence 

[GNU Genereal Public Licence v3.0](https://github.com/Swiss-Library-Service-Platform/pura-cloud-app/blob/main/LICENCE)

## Development

### Common Issues 
#### MacOS Error: OpenSSL Error 'ERR_OSSL_EVP_UNSUPPORTED'

Run in Terminal: `export NODE_OPTIONS=--openssl-legacy-provider`

and then run `eca start` again.