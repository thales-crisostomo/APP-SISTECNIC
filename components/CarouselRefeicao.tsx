import React, { useState} from 'react';
import {Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default function CarouselRefeicao(props) {

    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({item, index}) => (
        <View style={{width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}> {item.txrefeicao == 'Sem dados' ?  <Text style={{color: 'tomato'}}>{item.txrefeicao}</Text> : item.txrefeicao} </Text>
            {item.txrefeicao == 'Sem dados' ? 
                <>
                </>
            : <>
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
            <View style={{width: '100%', marginTop: 140,  position: 'absolute',  alignItems: 'center', justifyContent: 'center', paddingLeft: 100, paddingRight: 100}}>
                <Pagination
                    dotsLength={props.data.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{ backgroundColor: 'transparent', width: 40}} 
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
        </View>
        
    );
}