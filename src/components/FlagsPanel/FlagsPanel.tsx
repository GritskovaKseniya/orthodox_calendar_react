import React from 'react'
import { GETParamsAsObject } from '../../commonFunctions'

interface Props {
    className?: string
}
const FlagsPanel: React.FC<Props> = (props: Props) => {
     let params = GETParamsAsObject()

    function toggleParam(key: string) {
        console.log(params)
        if (key in params) {
            delete params[key]
        } else {
            params[key] = ''
        }
        
        const search = Object.keys(params).reduce((acc, val) => `${acc}${val}=${params[val]}&`, '?')
        window.location.search = search.slice(0, -1)
    }

    return (
        <div className={props.className}>
            <div>
                <label>Тексты</label>
                <input type="checkbox" onChange={() => toggleParam('texts')} checked={'texts' in params} />
            </div>
            <div>
                <label>Иконы</label>
                <input type="checkbox" onChange={() => toggleParam('ikons')} checked={'ikons' in params} />
            </div>
            <div>
                <label>Богослужебные указания</label>
                <input type="checkbox" onChange={() => toggleParam('instructions')} checked={'instructions' in params} />
            </div>
            <div>
                <label>Святые</label>
                <input type="checkbox" onChange={() => toggleParam('saints')} checked={'saints' in params} />
            </div>
        </div>
    )
}

export default FlagsPanel;
