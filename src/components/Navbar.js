import React, {Component} from "react";

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor: 'black',height:'50px'}}>
                <a style={{color:'white'}}>DAPP Yield Farming (Decentralized Banking)</a>
                <ul>
                    <li>
                        <small style={{color: "white"}}>Account Number
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;