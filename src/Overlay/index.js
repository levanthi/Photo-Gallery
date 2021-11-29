import './overlay.css'


function Overlay({setIsView})
{
    return(
        <span onClick={()=>setIsView(false)} className='overlay'></span>
    )
}

export default Overlay
