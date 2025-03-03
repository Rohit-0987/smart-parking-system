import { Link } from "react-router-dom";

export const Breadcrumb = ({list}) => {
    return (
        <div style={{backgroundColor: "whitesmoke"}}>
            <nav aria-label="breadcrumb" className="container py-2">
                <ol className="breadcrumb m-0">
                    {list.map((item, index) => {
                        const isLast = index === list.length - 1;
                        return (
                            <li key={"breadcrumb" + index} className={isLast ? "breadcrumb-item active" : "breadcrumb-item"} aria-current={isLast ? "page" : ""}>
                                {isLast
                                    ?
                                        item.name
                                    :   
                                        <Link style={{color: "black"}} to={item.link}>{item.name}</Link>
                                }
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}