import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AccordionComponent({post,index, deletePost, editPost}) {
    const [expanded, setExpanded] = React.useState(false);
    const {userName, title, body} = post;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
        <EditIcon color="primary" onClick={()=>editPost(index, post)} />
        <DeleteIcon style={{color: "red"}} onClick={()=>deletePost(index)} />

          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{userName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {body}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}