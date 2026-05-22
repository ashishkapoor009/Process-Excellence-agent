import os
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_deepseek import ChatDeepSeek
from dotenv import load_dotenv

load_dotenv()

class ProcessExcellencePlan(BaseModel):
    process_simplification: list[str] = Field(description="Actionable ideas to simplify the process and eliminate waste")
    process_standardization: list[str] = Field(description="Ideas to standardize the process across teams or locations")
    automation_and_ai: list[str] = Field(description="Specific AI and automation opportunities")
    improvement_opportunities: list[str] = Field(description="Other continuous improvement opportunities")
    overall_impact_score: int = Field(ge=1, le=10, description="Estimated business impact score from 1 to 10")
    estimated_effort: str = Field(description="High, Medium, or Low")

def get_process_excellence_chain():
    # If key is missing, LangChain will pick it up or error out
    # We will let ChatDeepSeek rely on environment variable DEEPSEEK_API_KEY
    llm = ChatDeepSeek(model="deepseek-chat", temperature=0.3, max_tokens=1500)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an elite Process Excellence and Business Transformation Consultant. Your objective is to help organizations optimize their workflows using lean methodologies, process simplification, standardization, and modern AI/automation."),
        ("human", "Process Name: {process_name}\nCurrent Workflow Steps: {workflow_steps}\nKnown Pain Points: {pain_points}\nTarget Goal: {target_goal}"),
    ])
    
    return prompt | llm.with_structured_output(ProcessExcellencePlan)
