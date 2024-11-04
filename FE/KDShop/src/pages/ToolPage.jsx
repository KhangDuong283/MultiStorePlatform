import CardContainer from "../components/CardContainer"
import ToolList from "../features/tools/components/ToolList"


const ToolPage = () => {
    return (
        <div className="pt-4">
            <CardContainer>
                <ToolList />
            </CardContainer>
        </div>
    )
}

export default ToolPage