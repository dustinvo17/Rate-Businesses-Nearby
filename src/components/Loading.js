import React from 'react'
import {CircularProgress,Container } from '@material-ui/core'
export default function Loading() {
    return (
    <Container style={{display:'flex',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <CircularProgress />
    </Container>
    )
}
