import React, {useState, useEffect} from 'react';
import {UserBlock, UserBlockSize, Button} from '@lumx/react';
import {getMSToken} from '@lumapps/sdk';

const API_URL = 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=https%3A%2F%2Fgraph.microsoft.com%2Fv1.0%2Fme%2Fpeople?skip=';


const Test = (props) => {
    const [page, setPage] = useState(0);
    const [graph, setGraph] = useState();
    

    useEffect(()=>{
        fetch(`${API_URL}${page}`, {
            headers : new Headers({
                'Authorization' : `Bearer ${getMSToken()}`
            })
        }).then(response => response.json())
        .then(data => setGraph(data));
    }, [page])

    const buildUserblock = (name, fields, idx) => {
        return <div style={{margin:8}}><UserBlock
                        name={name}
                        fields={fields}
                        avatar={`http://i.pravatar.cc/13${idx}`}
                        orientation={'horizontal'}
                        size={UserBlockSize.m}
                    /></div>
    }

    const loadPage = (loadNext) => {
        if(loadNext === false && page ===0 )return;
        if(loadNext){
            setPage(page+10);
        }
        else{
            setPage(page-10);
        }
    }

    const buildGraph = ()=>{
        var _g = [];
        if(graph && graph.value){
            graph.value.forEach((elm, idx) => {
                switch(elm.personType.class){
                    case 'Group' :
                        _g.push(<div style={{fontWeight:400}}>{elm.displayName}</div>);
                        break;
                    case 'Person':
                        _g.push(buildUserblock(elm.displayName, [elm.jobTitle], idx));
                        break;
                    default:
                        _g.push(<div>{`> ${elm.personType.class}`}</div>);
                }
    
            })
        }
        return _g;
    }

    return (<div style={{padding:24}}><div style={{fontWeight:600, textAlign:'center'}}>MS Graph</div>
    <div style={{padding:8}}>
        {
            buildGraph()
        }
    </div>   
        <div style={{display:'flex', flexDirection:'rows', justifyContent:'space-around'}}>
            <Button onClick={()=>loadPage(false)}>Previous</Button>
            <Button onClick={()=>loadPage(true)} >Next</Button>
        </div>
    </div>);
}

export default Test;