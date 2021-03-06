import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove, setStatus } from '../../store/actions/tasks'
import Button from '../Button';
import Card from '../Layout/Card';

const TaskCard = ({ task, removeTask, setStatus, user })  => {
  const { title, description, estimate, status, id, date, user_id } = task;
  const badge = status === 'pending' ? 'primary' : 'success';
  return (
    <Card>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <p>Estimate: {estimate}</p>
      <p>Status <span className={`badge badge-${badge}`}>{status}</span></p>
      <p>Date: {new Date(date).toLocaleString()}</p>
      {
        user.id !== user_id ? <p>User: {user.name}</p> : ""
      }
      <Button className="btn-danger" onClick={() => removeTask(id)}>Delete</Button>
      <Link className="btn btn-success" to={{pathname: `/tasks/edit/${id}`}}>Edit</Link>
      <div className="dropdown d-inline-block">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Status
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div className="dropdown-item" onClick={() => setStatus(id, 'finished')}>Finished</div>
          <div className="dropdown-item" onClick={() => setStatus(id, 'pending')}>Pending</div>
        </div>
      </div>
    </Card>
  );
}

export default connect(
  state => ({ user: state.users.current }), 
  dispatch => ({
    removeTask: id => dispatch(remove(id)),
    setStatus: (id, status) => dispatch(setStatus({ id, status })),
  })
)(TaskCard)