import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
    ScrollView
} from 'react-native';

import { Profiles } from '../components';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const Home = ({ navigation }) => {

    const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: SIZES.padding,
				}}
			>
				{/* Profile */}
				<TouchableOpacity
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: 50,
						height: 50,
					}}
					onPress={() => console.log("Profile")}
				>
					<Image
						source={images.profile_photo}
						style={{
							width: 40,
							height: 40,
							borderRadius: 20
						}}
					/>
				</TouchableOpacity>

				{/* Screen Mirror */}
				<TouchableOpacity
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: 50,
						height: 50,
					}}
					onPress={() => console.log("Screen Mirror")}
				>
					<Image
						source={icons.airplay}
						style={{
							width: 25,
							height: 25,
							tintColor: COLORS.primary
						}}
					/>
				</TouchableOpacity>
			</View>
		);
    }
    
    function renderNewSeasonSection() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                deceleration={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius * 2,
                }}
                data={dummyData.newSeason}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {x:newSeasonScrollX}}}
                ], { useNativeDriver: false })}
                renderItem={({ item, index }) => {
                    return (
						<TouchableWithoutFeedback
							onPress={() =>
								navigation.navigate("MovieDetail", {
									selectedMovie: item,
								})
							}
						>
							<View
								style={{
									width: SIZES.width,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{/* Thumbnail */}
								<ImageBackground
									source={item.thumbnail}
									resizeMode="cover"
									style={{
										width: SIZES.width * 0.85,
										height: SIZES.width * 0.85,
										justifyContent: "flex-end",
									}}
									imageStyle={{
										borderRadius: 20,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											height: 60,
											width: "100%",
											marginBottom: SIZES.radius,
											paddingHorizontal: SIZES.radius,
										}}
									>
										{/* Play Now */}
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												alignItems: "center",
												/* backgroundColor: COLORS.transparentBlack,
												borderRadius: 60,
												paddingLeft: 8, */
											}}
										>
											<View
												style={{
													alignItems: "center",
													justifyContent: "center",
													width: 40,
													height: 40,
													borderRadius: 20,
													backgroundColor:
														COLORS.transparentWhite,
												}}
											>
												<Image
													source={icons.play}
													resizeMode="contain"
													style={{
														width: 15,
														height: 15,
														tintColor: COLORS.white,
													}}
												/>
											</View>

											<Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3, }}>
												Play Now
											</Text>
										</View>

										{/* Still Watching */}
										{item.stillWatching.length > 0 && (
                                            <View style={{ justifyContent: "center", }}>
												{/* <Text style={{ color: COLORS.white, ...FONTS.h4, marginBottom: 10}}>Still Watching</Text> */}
                                                
                                                <Profiles style={{ width: "100%"}} profiles={item.stillWatching} />
											</View>
										)}
									</View>
								</ImageBackground>
							</View>
						</TouchableWithoutFeedback>
					);
                }}
            />
        )
    }

    function renderDots() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                {dummyData.newSeason.map((item, index) => {
                    return (
                        <View
                            key={`dot-${index}`}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 6,
                                width: 8,
                                height: 8,
                                backgroundColor:COLORS.primary
                            }}
                        ></View>
                    )
                })}
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
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {renderNewSeasonSection()}
                {renderDots()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;