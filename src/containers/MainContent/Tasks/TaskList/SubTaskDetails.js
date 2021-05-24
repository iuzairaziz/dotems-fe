import React , {Component } from 'react';
import AUX from '../../../../hoc/Aux_';
import { Link } from 'react-router-dom';


class Form_eliments extends Component{
 
render(){
    return(
           <AUX>
                <div className="page-content-wrapper">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-20">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Task Title</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Team Members</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Start Date</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">End Date</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Estimate Hours</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Actual Hours</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Work Done</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="example-text-input" className="col-sm-2 col-form-label">Status</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" placeholder="Artisanal kale" id="example-text-input" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                        <label>Description</label>
                                        <div>
                                            <textarea  className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                       
                                        
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </AUX>
        );
    }
}

export default Form_eliments;   