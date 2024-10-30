import CardContainer from "../components/CardContainer";
import ImageSlider from "../components/ImageSlider";
import SectionTitle from "../components/SectionTitle";
import CourseList from "../features/courses/components/CourseList";
import ToolList from "../features/tools/components/ToolList";

const Home = () => {
    return (
        <>
            <ImageSlider />


            <CardContainer>
                <SectionTitle>Công cụ bán chạy</SectionTitle>
                <ToolList />
            </CardContainer>

            <CardContainer>
                <SectionTitle>Khóa học bán chạy</SectionTitle>
                <CourseList />
            </CardContainer>
        </>
    );
};

export default Home;
