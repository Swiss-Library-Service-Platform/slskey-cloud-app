# SLSKey - Alma Cloud App
<img src=./preview/logo_text.png alt="drawing" width="400"/>

## Overview

This repository contains the [Alma Cloud App](https://developers.exlibrisgroup.com/cloudapps/) for the SLSKey service provided by [SLSP](https://slsp.ch/).

Currently this app supports to:
- check the SLSKey status of a selected user ✓
- activate a selected user for a SLSKey group ✓

For disabling, blocking users or see the history of users, please use the [SLSKey User Management Interface](https://slskey2.swisscovery.network/).

## Requirements

In order to use this app

- your institution must be subscriber to the SLSP SLSKey service.

Please [contact SLSP](https://slsp.ch/en/contact) if you have any questions.

## Daily Use

Start Screen of the app:

<img src=./preview/start.png alt="drawing" width="300"/>

Navigate to a Alma page with user entities. <br>
This can either be a user list with several entities or a user detail page. 

<img src=./preview/userfound.png alt="drawing" width="300"/>

Select the user you want to active for SLSKey.

<img src=./preview/user.png alt="drawing" width="300"/>

You can see the current status of the user for the SLSKey service. <br>
If you institution has multiple SLSKey groups, you see the status for each group.

To activate the user for SLSKey, click on the group you want to activate the user for.<br>
Finally, you can (optionally) enter a comment and click "Activate".

<img src=./preview/beforeactivate.png alt="drawing" width="300"/>

After activation you see the updated status of the user.

<img src=./preview/activated.png alt="drawing" width="300"/>

## Missing permissions

If you receive an error message "Access denied" when trying to use the app, please [contact SLSP](https://slsp.ch/en/contact) to unlock your user for the service.

## Issues and defects
Please use the GitHub "Issues" of this repository to report any defects. We will have a look into it as soon as possible.

## Licence 

[GNU Genereal Public Licence v3.0](https://github.com/Swiss-Library-Service-Platform/pura-cloud-app/blob/main/LICENCE)

## Development Notes

### Common Issues 
#### MacOS Error: OpenSSL Error 'ERR_OSSL_EVP_UNSUPPORTED'

Run in Terminal: `export NODE_OPTIONS=--openssl-legacy-provider`

and then run `eca start` again.