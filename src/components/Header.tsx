import {BaseComponent} from "./BaseComponent.tsx";
import "../css/header.scss"
import {Link} from "react-router-dom";

export class Header extends BaseComponent<object, object>{
    render() {
        return <div className="main-header">
            <Link to={"/"}><h1>Top Top Awards</h1></Link>
            <p>Edição 2025</p>
        </div>
    }
}