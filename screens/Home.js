import React, {useRef} from 'react';
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
    ScrollView,
    StatusBar,
} from 'react-native';

import { Profiles, ProgressBar } from '../components';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const Home = ({ navigation }) => {

    const newSeasonScrollX = useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
			<View
                style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
                    paddingHorizontal: SIZES.padding,
                    top: 0, left: 0, right: 0, paddingTop: 24,
                    height: 80,
                    position: 'absolute',
                    zIndex: 1000,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'

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
				overScrollMode="never"
				snapToAlignment="center"
				snapToInterval={SIZES.width}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={1}
				deceleration={0}
				contentContainerStyle={{
					marginTop: SIZES.radius * 7,
				}}
				data={dummyData.newSeason}
				keyExtractor={(item) => `${item.id}`}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: newSeasonScrollX },
							},
						},
					],
					{ useNativeDriver: false }
				)}
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

											<Text
												style={{
													marginLeft: SIZES.base,
													color: COLORS.white,
													...FONTS.h3,
												}}
											>
												Play Now
											</Text>
										</View>

										{/* Still Watching */}
										{item.stillWatching.length > 0 && (
											<View
												style={{
													justifyContent: "center",
												}}
											>
												{/* <Text style={{ color: COLORS.white, ...FONTS.h4, marginBottom: 10}}>Still Watching</Text> */}

												<Profiles
													style={{ width: "100%" }}
													profiles={
														item.stillWatching
													}
												/>
											</View>
										)}
									</View>
								</ImageBackground>
							</View>
						</TouchableWithoutFeedback>
					);
				}}
			/>
		);
    }

    function renderDots() {
        const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width)
        return (
            <View style={{
                marginTop: SIZES.padding,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                {dummyData.newSeason.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [8, 20, 8],
                        extrapolate: "clamp"
                    });

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 6,
                                width: dotWidth,
                                height: 8,
                                backgroundColor:dotColor
                            }}
                        ></Animated.View>
                    )
                })}
            </View>
        )
    }

    function renderContinueWatchingSection() {
        return (
			<View
				style={{
					marginTop: SIZES.padding + 8,
				}}
			>
				{/* Header */}
				<View
					style={{
						flexDirection: "row",
						paddingHorizontal: SIZES.padding,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							flex: 1,
							color: COLORS.white,
							...FONTS.h3 /* fontSize: SIZES.body3 */,
						}}
					>
						Continue Watching
					</Text>
					<Image
						source={icons.right_arrow}
						style={{
							width: 16,
							height: 16,
							tintColor: COLORS.primary,
						}}
					/>
				</View>

				{/* List */}
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					overScrollMode="never"
					contentContainerStyle={{
						marginTop: SIZES.padding,
						paddingBottom: SIZES.padding + 32,
					}}
					data={dummyData.continueWatching}
					keyExtractor={(item) => `${item.id}`}
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
										marginLeft:
											index == 0 ? SIZES.padding : 16,
										marginRight:
											index ==
											dummyData.continueWatching.length -
												1
												? SIZES.padding
												: 8,
									}}
								>
									{/* Thumbnails */}
									<Image
										source={item.thumbnail}
										resizeMode="cover"
										style={{
											width: SIZES.width / 3,
											height: SIZES.width / 3 + 64,
											borderRadius: 8,
										}}
									/>

									{/* Name */}
									<Text
										style={{
											marginTop: SIZES.base,
											color: COLORS.white,
											...FONTS.body4,
										}}
									>
										{item.name}
									</Text>

									{/* Progress Bar */}
									<ProgressBar
										containerStyle={{
											marginTop: SIZES.radius,
											/* position: "absolute",
											zIndex: 10, */
										}}
										barStyle={{
											height: 3,
										}}
										barPercentage={item.overallProgress}
									/>
								</View>
							</TouchableWithoutFeedback>
						);
					}}
				/>
			</View>
		);
    }

    return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.black,
			}}
		>
			<StatusBar
				currentHeight
				animated={true}
				backgroundColor="rgba(0,0,0,0)"
				barStyle="default"
				/* showHideTransition={statusBarTransition} */
				/* hidden={hidden} */
				translucent={true}
			/>

			{renderHeader()}

			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
				contentContainerStyle={{
					overscrollBehavior: "none",
					paddingBottom: 100,
				}}
			>
				{renderNewSeasonSection()}
				{renderDots()}
				{renderContinueWatchingSection()}
			</ScrollView>
		</SafeAreaView>
	);
}

export default Home;