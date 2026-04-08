## STACK RECOMMENDATION (WHAT I WOULD ACTUALLY DO)

### V1 (fastest path to working system):

- n8n (self-hosted)  
      
    
- OpenAI API (or Claude)  
      
    
- Airtable (or Supabase if you want slightly more control)  
      
    

Flow:

1. Vapi → webhook → n8n  
      
    
2. Extract transcript + metadata  
      
    
3. Send to GPT with structured prompt:  
      
    

- score (0–100)  
      
    
- intent  
      
    
- urgency  
      
    
- deal size estimate  
      
    

5. Store result  
      
    
6. Sort/rank leads  
      
    

That’s literally a 2–3 hour build.

---

### Where people screw this up (don’t do this):

- Overbuilding UI before scoring logic is proven  
      
    
- Using Zapier (you’ll get destroyed on cost with AI steps)  
      
    
- Trying to “train a model” instead of using structured prompting  
      
    
- Not forcing AI to return strict JSON → leads to chaos downstream  
      
    

---

### V2 (when you get serious):

- Keep n8n  
      
    
- Add Supabase (DB + auth)  
      
    
- Optional: Retool or simple frontend  
      
    

Then:

- Track lead performance → improve scoring model  
      
    
- Add feedback loop → AI learns what converts
    

  
