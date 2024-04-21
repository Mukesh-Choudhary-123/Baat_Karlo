import { Box, Paper, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightblue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <Paper
      elevation={10}
      sx={{ alignSelf: sameSender ? "flex-end" : "flex-start" }}
    >
      <div
        style={{
          alignSelf: sameSender ? "flex-end" : "flex-start",
          backgroundColor: "lightblue",
          color: "black",
          borderRadius: "5px",
          padding: "0.5rem",
          width: "fit-content",
        }}
      >
        {!sameSender && (
          <Typography
            color={"rgb(52, 152, 219)"}
            fontWeight={"600"}
            variant="caption"
          >
            {sender.name}
          </Typography>
        )}
        {content && <Typography>{content}</Typography>}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  target="_black"
                  download
                  style={{ color: "black" }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}

        <Typography variant="caption" color={"text.secondary"}>
          {timeAgo}
        </Typography>
      </div>
    </Paper>
  );
};

export default memo(MessageComponent);
