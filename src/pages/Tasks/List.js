import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../../components/TaskCard';

class List extends Component {

    delete = (e, ) => {

    }

    render() {
        return (
            <div>
                Tasks List
                {
                    this.props.tasks.map((task, i) => <TaskCard task={task} key={i}/>)
                }
            </div>
        )
    }
}

export default connect(state => ({
    tasks: state.tasks.list.filter(t => state.users.current.role === 'user' ? t.user_id === state.users.current.id : t)
}), null)(List);