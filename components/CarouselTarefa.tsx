import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default function CarrouselTarefa(props) {

    const [activeSlide, setActiveSlide] = useState(0);

    function dtinicio(data){
        var result = ''
        if(data){
            var dia = data.split('-')[2].split(' ')[0]
            var mes = data.split('-')[1].split(' ')[0]
            var ano = data.split('-')[0].split(' ')[0]
            result = dia + '/' + mes + '/' + ano
        }
        return result
    }

    function dtfinal(data){
        var result = ''
        if(data){
            var dia = data.split('-')[2].split(' ')[0]
            var mes = data.split('-')[1].split(' ')[0]
            var ano = data.split('-')[0].split(' ')[0]
            result = dia + '/' + mes + '/' + ano
        }
        return result
    }


    const renderItem = ({item, index}) => (
        <View style={{width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}> {item.nmagenda == 'Sem dados' ?  <Text style={{color: 'tomato'}}>{item.nmagenda}</Text> : item.nmagenda} </Text>
            {item.nmagenda == 'Sem dados' ? 
                <>
                </>
            : <>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 17, marginTop: 10, textAlign: 'center'}}> {dtinicio(item.dtinicio)}</Text>
                    <Text style={{fontSize: 17, marginTop: 10, textAlign: 'center'}}> até</Text>
                    <Text style={{fontSize: 17, marginTop: 10, textAlign: 'center'}}> {dtfinal(item.dtfim)}</Text>
                </View>
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