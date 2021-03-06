import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/Table';


class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title'},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { key: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />},
        { key: 'edit', content: movie => <Link to={`/movies/${movie._id}`}><button className="btn btn-warning text-white">
            Edit
        </button></Link> }
    ];

    deleteColumn =  { key: 'delete', content: movie =>
    <button onClick={() => this.props.onDelete(movie)} 
    className="btn btn-danger">Delete</button>
    }

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if(user && user.isAdmin)
        this.columns.push(this.deleteColumn)
    }


    render() { 
        const { movies, onSort, sortColumn} = this.props;

        return (  
       <Table 
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
       />
        );
    }
}
 


 
export default MoviesTable;