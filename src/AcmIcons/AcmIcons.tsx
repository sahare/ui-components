import React from 'react'
import { AcmTemplateIcon, AWSIcon, GCPIcon, AzureIcon, CloudIcon, BareMetalIcon, VMWareIcon } from './Icons'
import ibmCloud from '../assets/IBM-Cloud.png'

export enum AcmIconVariant {
    template = 'template',
    aws = 'aws',
    gcp = 'gcp',
    azure = 'azure',
    ibm = 'ibm',
    baremetal = 'baremetal',
    vmware = 'vmware',
    cloud = 'cloud',
}

export function AcmIcon(props: { icon: AcmIconVariant }) {
    switch (props.icon) {
        case AcmIconVariant.template:
            return <AcmTemplateIcon />
        case AcmIconVariant.aws:
            return <AWSIcon />
        case AcmIconVariant.gcp:
            return <GCPIcon />
        case AcmIconVariant.azure:
            return <AzureIcon />
        case AcmIconVariant.ibm:
            return <img src={ibmCloud} role="presentation" />
        case AcmIconVariant.baremetal:
            return <BareMetalIcon />
        case AcmIconVariant.vmware:
            return <VMWareIcon />
        case AcmIconVariant.cloud:
            return <CloudIcon />
    }
}
