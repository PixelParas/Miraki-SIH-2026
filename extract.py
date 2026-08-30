import json

def extract_res(step_idx, out_file):
    with open('/home/pixel/.gemini/antigravity/brain/15718556-a3bf-4c46-a19f-7f706357fbed/.system_generated/logs/transcript_full.jsonl', 'r') as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get('step_index') == step_idx:
                    content = data.get('content', '')
                    # output is usually inside Output:\n
                    out = content.split('Output:\n')[1].strip()
                    if out.endswith('</SYSTEM_MESSAGE>'):
                        # clean up
                        out = out[:out.rfind('\n\n</SYSTEM_MESSAGE>')]
                    with open(out_file, 'w') as out_f:
                        out_f.write(out)
                    print(f"Extracted {out_file}")
            except Exception as e:
                pass

extract_res(250, 'src/pages/QuizAttempt_original.tsx')
extract_res(325, 'src/pages/QuizResult_original.tsx')
