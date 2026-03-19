---
sidebar_position: 6
---

# mcp-code-execution

Implement the MCP Code Execution pattern for token-efficient agent operations.

## The Pattern

1. **SKILL.md** tells the agent WHAT to do (~100 tokens)
2. **scripts/*.py** does the actual work (0 tokens in context)
3. Only the **final result** enters context (~10 tokens)

## Usage

```bash
# Create a new MCP wrapper
python .claude/skills/mcp-code-execution/scripts/create_mcp_wrapper.py <name>

# Test token efficiency
python .claude/skills/mcp-code-execution/scripts/test_wrapper.py <name>
```

## Before vs After

### Before: Direct MCP (50,000 tokens)
```
TOOL CALL: k8s.getPods(namespace: "default")
→ returns full pod JSON (25,000 tokens)
```

### After: Script Execution (10 tokens)
```python
pods = json.loads(result.stdout)["items"]
running = sum(1 for p in pods if p["status"]["phase"] == "Running")
print(f"All {running} pods running")
```

## Best Practices
- Filter data in scripts, not in agent context
- Return counts and summaries, not raw data
- Use exit codes: 0 = success, 1 = failure
- Keep output under 5 lines
