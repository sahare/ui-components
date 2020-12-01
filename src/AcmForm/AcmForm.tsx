import { Button, ButtonProps, Form, FormProps } from '@patternfly/react-core'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export const FormContext = createContext<{
    readonly validate: boolean
    setValidate: (validate: boolean) => void
    readonly errors: { [id: string]: string | undefined }
    setError: (id: string, error?: string) => void
    readonly isReadOnly: boolean
    setReadOnly: (disabled: boolean) => void
}>({
    validate: false,
    setValidate: noop,
    errors: {},
    setError: noop,
    isReadOnly: false,
    setReadOnly: noop,
})

export function AcmFormProvider(props: { children: ReactNode }) {
    const [validate, setValidate] = useState(false)
    const [errors, setErrors] = useState<{ [id: string]: string | undefined }>({})
    const [isReadOnly, setReadOnly] = useState<boolean>(false)
    const setError = (id: string, error?: string) => {
        setErrors((prevState) => {
            const copy = { ...prevState }
            copy[id] = error
            return copy
        })
    }
    // useEffect(() => {
    //     if (validate) {
    //         setErrors({})
    //     }
    // }, [validate])

    return (
        <FormContext.Provider
            value={{ validate, setValidate, errors, setError, isReadOnly: isReadOnly, setReadOnly: setReadOnly }}
        >
            {props.children}
        </FormContext.Provider>
    )
}

export function useFormContext() {
    return useContext(FormContext)
}

export function AcmForm(props: FormProps) {
    return (
        <AcmFormProvider>
            <Form {...props} />
        </AcmFormProvider>
    )
}

export function AcmSubmit(props: ButtonProps) {
    const context = useContext(FormContext)
    const [isDisabled, setDisabled] = useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
        if (context.validate) {
            const hasError = Object.keys(context.errors).find((id) => context.errors[id] != undefined) != undefined
            setDisabled(hasError)
        }
    }, [context.errors])
    return (
        <Button
            variant="primary"
            spinnerAriaValueText={isLoading ? 'Loading' : undefined}
            isLoading={isLoading}
            onClick={async (event) => {
                const hasError = Object.keys(context.errors).find((id) => context.errors[id] != undefined) != undefined
                if (hasError) {
                    context.setValidate(true)
                    setDisabled(hasError)
                } else {
                    setIsLoading(true)
                    context.setReadOnly(true)
                    /* istanbul ignore else */
                    if (props.onClick) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await props.onClick(event)
                        context.setReadOnly(false)
                        setIsLoading(false)
                    }
                }
            }}
            isDisabled={isDisabled || props.isDisabled}
        >
            {props.children}
        </Button>
    )
}

function noop() {
    // Do Nothing
}
