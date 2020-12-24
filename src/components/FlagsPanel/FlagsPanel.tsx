import React, { useState } from 'react'
import { GETParamsAsObject } from '../../domain/functions'
import { Flags, FlagsKeys } from '../../domain/types'
import { Props } from './types'

const FlagsPanel: React.FC<Props> = (props: Props) => {
    const [params, setParams] = useState<Flags>(props.initialValues)

    function toggleParam(key: FlagsKeys) {
        setParams({...params, [key]: !params[key]})
    }

    function handleSubmit() {
        // Order matters to rewrite old values
        const newURLParams = { ...GETParamsAsObject(), ...params}
        window.location.search = Object.keys(newURLParams)
            .reduce((acc, val) => newURLParams[val] ? `${acc}${val}=${newURLParams[val]}&`: acc, '?')
            .slice(0, -1)
    } 

    return (
        <div className={props.className}>
            <div>
                <label>Тексты</label>
                <input type="checkbox" onChange={() => toggleParam(FlagsKeys.Texts)} checked={params.texts} />
            </div>
            <div>
                <label>Иконы</label>
                <input type="checkbox" onChange={() => toggleParam(FlagsKeys.Ikons)} checked={params.ikons} />
            </div>
            <div>
                <label>Богослужебные указания</label>
                <input type="checkbox" onChange={() => toggleParam(FlagsKeys.Instructions)} checked={params.instructions} />
            </div>
            <div>
                <label>Святые</label>
                <input type="checkbox" onChange={() => toggleParam(FlagsKeys.Saints)} checked={params.saints} />
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default FlagsPanel;
