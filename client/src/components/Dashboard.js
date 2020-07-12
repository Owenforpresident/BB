import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import Search from './Search';


const Dashboard = ({auth}) => {
  
        return   (
           <div><Search /></div>
        )
}


const mapStateToProps = state => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(Dashboard);
