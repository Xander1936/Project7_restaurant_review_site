/* import React, {Component} from 'react';
import ListItem from './ListItem';



export default class TodoList extends Component {

    constructor() {
        super();
        this.state = {
            item: '',
            toDo: [
                'go shopping',
                'Make a short prayer',
                'Have lunch with Mary',
                'Go to work',
            ],
        };
    }

    handleNewItemChange = (e) => {
        this.setState({item: e.target.value});
    }
    
    handleAddItem = () => {
        if(this.state.item){
            let items = this.state.toDo;
            items.push(this.state.item);
            this.setState({toDo: items, item: ''});
        }
    }

    handleDeleteItem = (idx) => {
        if(idx || idx === 0){
            let items = this.state.toDo;
            delete items[idx];
            this.setState({toDo: items});
        }
    }

    render() {
        return (
            <div>
                <input value={this.state.item} onChange={this.handleNewItemChange} type="text" placeholder="Enter todo name/desc" />
                <button onClick={this.handleAddItem} >Add</button>
                <ul>
                    {
                        this.state.toDo.map((element, i) => (
                            <ListItem key={i} idx={i} value={element} onDelete={this.handleDeleteItem} />
                        ))
                    } 
                </ul>
            </div>
        )
    }
}
 */