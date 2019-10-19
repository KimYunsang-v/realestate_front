import React, { Component } from 'react';
import { Grid, Image, Segment, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';

const hosingType=[
    {value :require('../../../image/apart.png')},
    {value :require('../../../image/officetel.PNG')},
    {value :require('../../../image/house.jpg')}
]

class ResultList extends Component {
    static defaultProps = {
        info: {
            no:'0',
            city: 'city',
            groop: 'groop',
            dong: 'dong',
            name: 'name',
            area: 'area',
            floor: 'floor',
            type: 'type',
            constructorYear: 'constructorYear',
            price:'price',
            deposit: 'deposit',
            dealType: 'dealType',
        },
      }
    render() {
        const {address, dong, name, area, floor, type, price, deposit, dealType} = this.props.info
        var housingImage= ''
        if(type==='apart'){
            housingImage=hosingType[0].value
        }else if(type==='officetel'){
            housingImage=hosingType[1].value
        }else {
            housingImage=hosingType[2].value
        }

        return (
            <div>
                <Segment raised>
                    <Grid>
                        <Grid.Column width={4}>
                            <Image src={housingImage} />
                        </Grid.Column>

                        <Grid.Column width={9}>
                        <Label circular>{dealType}</Label>
                        <h2 className="title">
                        {deposit?(<font color="orange">{deposit}/{price}</font>):(<font color="orange">{price}</font>)}
                        </h2><h4 className="title">({area}㎡)</h4>
                        <font color="grey"><h4>{address} {dong} {name} {floor}...</h4>
                        <h4>{type}</h4></font>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default ResultList;