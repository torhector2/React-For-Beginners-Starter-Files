import React, {Component} from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match
        //first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState( {order: JSON.parse(localStorageRef)} )
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentWillUnmount() {
        //disconnect from this particular fish-store in the database. Stop syncing the store since it can lead to memory leaks
        //because everytime we mount the app we sync to a new store-name (remember this are random fish stores names) but we don't 
        //disconnect from it when we finish. this makes the app to keep a connection with N different databases in Firebase (or stores)
        //SO HERE WE DISCONNECT
        base.removeBinding(this.ref)
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
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

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes   })
    }

    addToOrder = (key) => {
        const order = { ...this.state.order}
        order[key] = order[key] + 1 || 1
        this.setState( { order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul>
                        { Object.keys(this.state.fishes).map(key => 
                            <Fish 
                                key={key} 
                                index={key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                            />
                        ) }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        )
    }
}

export default App