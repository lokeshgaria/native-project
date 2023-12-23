import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter, Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SHADOWS, SIZES, icons } from "../../constants";
import useFetch from "../../hooks/useFetch";

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const tabs = ["About", "Qualifications", "Responsibilities"];

  const [activeTab, setActive] = useState(tabs[0]);
  const onRefresh =useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  },[])
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const displayTableContent = () => {
    switch (activeTab) {
      case "Qualifications": {
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["NA"]}
          />
        );
      }

      case "About": {
        return (
          <JobAbout title="About" info={data[0].job_description ?? ["NA"]} />
        );
      }
      case "Responsibilities": {
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["NA"]}
          />
        );
      }
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          title: "",
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimesion="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimesion="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={SIZES.xLarge} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong </Text>
          ) : data.length === 0 ? (
            <Text>no data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActive={setActive}
              />

              {displayTableContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://carrer.google.com/job/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
