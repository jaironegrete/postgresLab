DROP TABLE IF EXISTS CONTENT_TABLE;
CREATE TABLE CONTENT_TABLE (
	content_code SERIAL NOT NULL PRIMARY KEY,
	description CHARACTER VARYING (255)
);

DROP FUNCTION IF EXISTS notify_realtime;
CREATE FUNCTION notify_realtime () RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
	 PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, 'type', TG_OP)::text);
	 raise notice 'Value: %', json_build_object('table', TG_TABLE_NAME, 'type', TG_OP)::text;
	RETURN NEW ;
END ; 
$$;

DROP TRIGGER IF EXISTS updated_realtime_trigger ON CONTENT_TABLE;
CREATE TRIGGER updated_realtime_trigger AFTER INSERT ON CONTENT_TABLE FOR EACH ROW EXECUTE PROCEDURE notify_realtime();