import React, { useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default function Carrousel(props) {

    const [activeSlide, setActiveSlide] = useState(0);
   
    const renderItem = ({item, index}) => (
        <View style={{width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}> {item.nmdisciplina == 'Sem dados' ?  <Text style={{color: 'tomato'}}>{item.nmdisciplina}</Text> : item.nmdisciplina} </Text>
            {item.nmdisciplina == 'Sem dados' ? 
                <>
                </>
            : <>
                <Text numberOfLines={1} style={{fontSize: 17, fontWeight: 'bold'}}> {item.nmusuario} </Text>
                <Text style={{fontSize: 17, marginTop: 10}}> {item.hrinicio} - {item.hrfim}</Text>
                <Text style={{fontSize: 17, marginTop: 10}}> {item.idsemana == 1 ? 'Segunda-feira' : '' || item.idsemana == 2 ? 'Terça-feira' : '' || item.idsemana == 3 ? 'Quarta-feira' : '' || item.idsemana == 4 ? 'Quinta-feira' : '' || item.idsemana == 5 ? 'Sexta-feira' : '' } </Text>
            </> }
        </View>
    )

    return (
        <View style={{flexDirection: 'column'}}> 
            <Carousel
                //ref={(c) => { this._carousel = c; }}
                data={props.data}
                renderItem={renderItem}
                sliderWidth={180}
                itemWidth={180}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={props.data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'transparent', position: 'absolute', marginTop: 140, width: '100%'}} 
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: '#00B0FF',
                    marginHorizontal: -10,
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}