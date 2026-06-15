from agents import build_reader_agent , build_search_agent , writer_chain , critic_chain
from socket_client import emit_progress

def run_research_pipeline(topic: str, callback=None) -> dict:
    def send_update(callback, agent, status):
        if callback:
            callback({
                "agent": agent,
                "status": status
            })

    state = {}

    #search agent working 
    print("\n"+" ="*50)
    print("step 1 - search agent is working ...")
    print("="*50)

    search_agent = build_search_agent()
    emit_progress("🔍 Search Agent", "Working...")
    search_result = search_agent.invoke({
        "messages" : [("user", f"Find recent, reliable and detailed information about: {topic}")]
    })
    emit_progress("🔍 Search Agent", "Completed")
    state["search_results"] = search_result['messages'][-1].content

    print("\n search result ",state['search_results'])

    #step 2 - reader agent 
    print("\n"+" ="*50)
    print("step 2 - Reader agent is scraping top resources ...")
    print("="*50)

    reader_agent = build_reader_agent()
    emit_progress("📖 Reader Agent", "Scraping Resources...")
    reader_result = reader_agent.invoke({
        "messages": [("user",
            f"Based on the following search results about '{topic}', "
            f"pick the most relevant URL and scrape it for deeper content.\n\n"
            f"Search Results:\n{state['search_results'][:800]}"
        )]
    })
    emit_progress("📖 Reader Agent", "Completed")

    state['scraped_content'] = reader_result['messages'][-1].content

    print("\nscraped content: \n", state['scraped_content'])

    #step 3 - writer chain 

    print("\n"+" ="*50)
    print("step 3 - Writer is drafting the report ...")
    print("="*50)

    research_combined = (
        f"SEARCH RESULTS : \n {state['search_results']} \n\n"
        f"DETAILED SCRAPED CONTENT : \n {state['scraped_content']}"
    )
    emit_progress("✍️ Writer Agent", "Drafting Report...")
    state["report"] = writer_chain.invoke({
        "topic" : topic,
        "research" : research_combined
    })
    emit_progress("✍️ Writer Agent", "Completed")

    print("\n Final Report\n",state['report'])

    #critic report 

    print("\n"+" ="*50)
    print("step 4 - critic is reviewing the report ")
    print("="*50)

    emit_progress("🧠 Critic Agent", "Reviewing Report...")
    state["feedback"] = critic_chain.invoke({
        "report":state['report']
    })
    emit_progress("🧠 Critic Agent", "Completed")

    print("\n critic report \n", state['feedback'])
    return state



if __name__ == "__main__":
    topic = input("\n Enter a research topic : ")
    run_research_pipeline(topic)