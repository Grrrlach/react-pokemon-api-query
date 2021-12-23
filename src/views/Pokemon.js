import React, { Component } from 'react'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import Table from 'react-bootstrap/Table'

const formSchema = Yup.object().shape({
    "pokename": Yup.string().required("Required"),
    "dumdum": Yup.string().email().required("YOOOOOOOOOOOO, this is required!"),


})

const initialValues = {
    pokename: '',
    email: ''
}



export default class Pokemon extends Component {

    constructor() {
        super();
        this.state={
            pokename: {},
            notPokename : false,
            pokedata:{}
        };
    }

    handleSubmit=({pokename})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
            .then(console.log("API Queried"))
            .then(result=>result.json())
            .then(data=>{
                this.setState({
                    pokename: pokename, pokedata: data, notPokename: false }, ()=>console.log(this.state.pokedata))
            })
            .catch(error=>{console.log(error)}); this.setState({notPokename:true}, this.setState({pokedata: 'Try a different pokemon name'}))
    }

    render() {
        return (
            <div>
                <h1>Catch 'em all!</h1>
                {this.state.notPokename ? <small style={{color:"red"}}>That pokemon doesn't exist</small>:""}
                <Formik initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={
                            (values, {resetForm})=>{
                                
                                
                                this.handleSubmit(values);
                                resetForm(initialValues);
                                

                                }
                                
                            }>
                                {
                                    ({errors, touched})=>(
                                        <Form>
                                            <label htmlFor="pokename" className="form-label">Enter a Pokemon name:</label>
                                            <Field name="pokename" className="form-control"/>
                                            {errors.pokename && touched.pokename ? (<div style={{color:'red'}}>{errors.pokedata}</div>):null}

                                            <label htmlFor="dumdum" className="form-label">Enter your email address so I can sell it to marketers.</label>
                                            <Field name="dumdum" className="form-control"/>
                                            {errors.dumdum && touched.dumdum ? (<div style={{color:'red'}}>{errors.dumdum}</div>):null}
                                            
                                            <button type="submit" className="btn btn-primary">Catch 'em all!</button>
                                        </Form>
                                    )
                                }


                </Formik>
                
                {this.state.pokedata.name?.length > 0 ?        
                    <Table striped bordered hover>
                    
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>HP</th>
                            <th>Defense</th>                    
                            <th>Attack</th>
                            <th>Image</th>                    
                            
                            </tr>
                        </thead>
                        <tbody>
                        
                                {
                                    <tr>
                                        <td>{this.state.pokedata.name}</td>
                                        
                                        <td>{this.state.pokedata.stats[0].base_stat}</td>
                                        <td>{this.state.pokedata.stats[1].base_stat}</td>
                                        <td>{this.state.pokedata.stats[2].base_stat}</td>
                                        <td><a href={`https://en.m.wikipedia.org/wiki/${this.state.pokename}`}><img src={this.state.pokedata.sprites.front_shiny} alt="pokemon image"/></a></td>
                                    </tr>
                                }

                    
                        
                        
                        
                        
                        </tbody>
            
                    </Table>
                :" "}

            </div>
        )
    }
}