
function Hamburger({onClick}) {
    return (
        <>  
            <div className="
                w-[40px]
                h-[40px]
                border-[1px]
                border-[rgba(0,0,0,0.3)]
                rounded-md

                hover:border-[rgba(0,0,0,0.5)]
                hover:cursor-pointer
                hover:bg-black/5

                active:bg-black/10

            "
            onClick={onClick}
            
            >
            </div>
        </>
    )
}

export default Hamburger