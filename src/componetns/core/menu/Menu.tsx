interface MenuProps{
    isVisible : boolean;
}

export function  Menu(props: MenuProps){
    return(
        <div className={"fixed top-0 h-screen w-[300px] duration-300 mt-20 flex flex-col gap-16 justify-center" +
            "items-start bg-orange-400 text-blue-50 pt-20" }
             style={{right: props.isVisible ? 0 : -300}}>
            <button>Hire</button>
            <button>Events</button>
            <button>Group Offer</button>
            <button>News</button>
            <button>Contact</button>
        </div>
    )
}