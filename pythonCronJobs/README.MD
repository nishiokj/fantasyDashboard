### This set of scripts work as ETL Pipelines in extracting data from various APIs, transforming the data and loading it into redis

### Installation
1. Create virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source venv/bin/activate
     ```
3. Install requirements:
     pip install -r requirements.txt