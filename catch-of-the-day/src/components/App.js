import React, {Component} from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends Component {
    state = {
        fishes: {},
        order: {}
    }

    addFish = (fish) => {
        //1. take a copy of the existing state 
        const fishes = { ...this.state.fishes }
        //2. add our fish
        fishes[`fish${Date.now()}`] = fish 
        //3. set the new fishes object to state
        this.setState({
            fishes: fishes
        })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}

export default App