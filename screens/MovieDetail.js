import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { ProgressBar } from '../components';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const MovieDetail = ({ navigation, route }) => {
    
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    React.useEffect(() => {
        let { selectedMovie } = route.params;
        setSelectedMovie(selectedMovie);
    }, []);

    function renderHeaderBar() {
        return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: SIZES.padding,
				}}
			>
				{/* Back Button */}
				<TouchableOpacity
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: 48,
						height: 48,
						borderRadius: 16,
						backgroundColor: COLORS.transparentBlack,
					}}
					onPress={() => navigation.goBack()}
				>
					<Image
						source={icons.left_arrow}
						style={{
							width: 12,
							height: 12,
							tintColor: COLORS.white,
						}}
					/>
				</TouchableOpacity>

				{/* Share Button */}
				<TouchableOpacity
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: 48,
						height: 48,
						borderRadius: 16,
						backgroundColor: COLORS.transparentBlack,
					}}
					onPress={() => console.log("Share")}
				>
					<Image
						source={icons.upload}
						style={{
							width: 16,
							height: 16,
							tintColor: COLORS.white,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
    }
    
    function renderHeaderSection() {
        return (
			<ImageBackground
				source={selectedMovie?.details?.image}
				resizeMode="cover"
				style={{
					width: "100%",
					height:
						SIZES.height < 700
							? SIZES.height * 0.6
							: SIZES.height * 0.75,
				}}
			>
				<View
					style={{
						flex: 1,
						paddingTop: Platform.OS === "ios" ? 40 : 32,
						width: SIZES.width,
					}}
				>
					{renderHeaderBar()}

					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
						}}
					>
						<LinearGradient
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							colors={["transparent", "#242526"]}
							style={{
								width: "100%",
								height: SIZES.height * 0.5,
								alignItems: "center",
								justifyContent: "flex-end",
							}}
                        >
                            {/* Season */}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    letterSpacing: 1,
                                    ...FONTS.body4
                                }}
                            >
                                {selectedMovie?.details?.season}
                            </Text>

                            {/* Name */}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    marginTop: SIZES.base * 0.2,
                                    textTransform: "uppercase",
                                    ...FONTS.h1
                                }}
                            >
                                {selectedMovie?.name}
                            </Text>
                        </LinearGradient>
					</View>
				</View>
			</ImageBackground>
		);
    }

    function renderCategoryRatings() {
        return (
			<View
				style={{
					flexDirection: "row",
					marginTop: SIZES.base,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* Age */}
				<View style={[styles.categoryContainer,{marginLeft: 0,},]}>
					<Text style={{color: COLORS.white,...FONTS.body4,}}>
						{selectedMovie?.details?.age}
					</Text>
				</View>

				{/* Genre */}
				<View  style={[styles.categoryContainer,{paddingHorizontal: SIZES.padding,},]}>
					<Text style={{color: COLORS.white,...FONTS.body4,letterSpacing:1}}>
						{selectedMovie?.details?.genre}
					</Text>
				</View>

				{/* Ratings */}
                <View style={[styles.categoryContainer]}>
                    <Image source={icons.star} resizeMode="contain" style={{width:12,height:12,}} />
					<Text style={{color: COLORS.white,...FONTS.body4,paddingLeft:8}}>
						{selectedMovie?.details?.ratings}
					</Text>
				</View>
			</View>
		);
    }

    function renderMovieDetails() {
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                /* marginTop: -72, */
                justifyContent: 'space-around'
            }}>
                {/* Title, running time and progress bar */}
                <View
                    style={{marginTop:SIZES.radius}}
                >
                    {/* Title and running time */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, color:COLORS.white, ...FONTS.body5}}>{selectedMovie?.details?.currentEpisode}</Text>
                        <Text style={{color:COLORS.white, ...FONTS.body5}}>{selectedMovie?.details?.runningTime}</Text>
                    </View>

                    {/* Progress bar */}
                    <ProgressBar
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        barStyle={{
                            height: 4,
                            borderRadius: 3
                        }}
                        barPercentage={selectedMovie?.details?.progress}
                    />
                </View>

                {/* Watch button */}
                <TouchableOpacity
                    style={{
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 16,
                        borderRadius: 15,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                        {selectedMovie?.details?.progress === "0%" ? "WATCH NOW" : "CONTINUE WATCHING"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
		<SafeAreaView
			style={{
				flex: 1,
                backgroundColor: COLORS.black,
			}}
		>
            
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
				contentContainerStyle={{
					flex: 1,
                    backgroundColor: COLORS.black,
				}}
            >
                {/* Header */}
                {renderHeaderSection()}
                
                {/* Category & Rating */}
                {renderCategoryRatings()}

                {/* Movie Details */}
                {renderMovieDetails()}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	categoryContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: SIZES.base,
		paddingHorizontal: SIZES.base,
		paddingVertical: 6,
		borderRadius: SIZES.base,
		backgroundColor: COLORS.transparentWhite,
	},
});

export default MovieDetail;