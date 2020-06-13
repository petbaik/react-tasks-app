import { ADD_TASK } from './types';
import { isEmpty } from 'lodash';

export const add = payload => {
    return async (dispatch, state)  => {
        console.log(state());
        const { current } = state().users;
        if (isEmpty(current)) {
            return {
                error: "You need to be loged in to add task"
            }
        }
        const task = { ...payload, user_id: current.id, status: 'waiting' };
        return dispatch({
            type: ADD_TASK,
            payload: task
        })
    }
}